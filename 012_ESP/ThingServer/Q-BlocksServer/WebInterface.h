#ifndef WEB_INTERFACE_H
#define WEB_INTERFACE_H
#include <Arduino.h>
#include <stdint.h>
#include <vector>
#include <string>
#include <stdlib.h> 

class QStatus {
public:
	QStatus(void){
		seqNum = 0;
		cardStatus = false;
		i2cStatus = true;
		running = false;
	};
	void buildJsonStr( void ){
		char buffer[40];
		jsonStr = "";
		jsonStr += "{\"seqNum\":";
		sprintf(buffer, "%d", seqNum);
		jsonStr += buffer;
		jsonStr += ",\"status\":{\"card\":";
		if(cardStatus){jsonStr += "true";}else{jsonStr += "false";}
		jsonStr += ",\"i2c\":";
		if(i2cStatus){jsonStr += "true";}else{jsonStr += "false";}
		jsonStr += ",\"running\":";
		if(running){jsonStr += "true";}else{jsonStr += "false";}
		jsonStr += "},\"console\":[\"test message\"]}";
	};
	uint8_t seqNum;
	bool cardStatus;
	bool i2cStatus;
	bool running;
	String jsonStr;
	std::vector< String > console;
};

/* Command set:
0: ACK
1: NACK (will re-request)
2: Clear status
3: debug
*/

class QCommand {
public:
	QCommand(void){
		command = -1;
		jsonStr = "{\n  \"command\": 559\n}";
	};
	void parseJsonStr( void ){
		int index1;
		int index2;
		jsonStr.replace(" ", "");
		jsonStr.replace("\t", "");
		jsonStr.replace("\n", "");
		jsonStr.replace("\r", "");
		index1 = jsonStr.indexOf("\"command\":");
		if( index1 == -1 ){ command = -1; return; };
		index1 += 10;
		if( index1 > jsonStr.length() ){ command = -1; return; };
		index2 = jsonStr.indexOf("}", index1);
		if( index1 > index2 ){ command = -1; return; };
		command = atoi(jsonStr.substring(index1, index2).c_str());
	};
	int8_t command;
	String jsonStr;
};

#endif