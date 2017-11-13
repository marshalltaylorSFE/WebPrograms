#ifndef WEB_INTERFACE_H
#define WEB_INTERFACE_H
#include <Arduino.h>
#include <stdint.h>
#include <vector>
#include <string>

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
		if(cardStatus){
			jsonStr += "true";
		}else{
			jsonStr += "false";
		}
		jsonStr += ",\"i2c\":";
		if(i2cStatus){
			jsonStr += "true";
		}else{
			jsonStr += "false";
		}
		jsonStr += ",\"running\":";
		if(running){
			jsonStr += "true";
		}else{
			jsonStr += "false";
		}
		jsonStr += "},\"console\":[\"test message\"]}";
	};
	uint8_t seqNum;
	bool cardStatus;
	bool i2cStatus;
	bool running;
	String jsonStr;
	std::vector< String > console;
};


#endif