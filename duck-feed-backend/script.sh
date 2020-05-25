#!/bin/bash

while [ $# -gt 0 ]; do
	  case "$1" in
	  	--context=*)
			context="${1#*=}"
		;;
		--heartbeats=*)
			heartbeats="${1#*=}"
		;;
		*)
			printf "***************************\n"
			printf "* Error: Invalid argument.*\n"
			printf "***************************\n"
			exit 1
	esac
	shift
done


context=${context:-dev}
heartbeats=${heartbeats:-10}


# rabbitmq
serviceName[0]="rabbitmq"
toPort[0]=15672
fromPort[0]=15672

# rabbitmq
serviceName[1]="rabbitmq"
toPort[1]=5672
fromPort[1]=5672

# static data service
serviceName[2]="hyperpay-service"
toPort[2]=8000
fromPort[2]=80

# mysql
serviceName[3]="payment-engine-service-mysql"
toPort[3]=3306
fromPort[3]=3306


# execute port forwarding commands
for (( i=0; i<${#serviceName[*]}; i++ ))
do
	command="kubectl --context=$context port-forward svc/${serviceName[$i]} ${toPort[$i]}:${fromPort[$i]} &"
	echo $command
	eval $(echo $command)
done


# make heartbeats for every toPort
while true
do
	sleep $heartbeats

	for (( k=0; k<${#serviceName[*]}; k++ ))
	do
		CURL_RESPONSE=`curl -s -o /dev/null -w "%{http_code}" http://localhost:${toPort[$k]} > /dev/null 2>&1`
		echo $CURL_RESPONSE
	done
done
