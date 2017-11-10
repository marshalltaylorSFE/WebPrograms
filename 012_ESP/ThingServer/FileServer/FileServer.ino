#include <WiFiClient.h>
#include <ESPWebServer.h>
#include <ESPmDNS.h>
#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include <string>

#define SD_CS_PIN 33
#define SD_CD_PIN 38

#ifndef LED_BUILTIN
#define LED_BUILTIN 2
#endif

const char* ssid     = "sparkfun-guest";
const char* password = "sparkfun6333";

ESPWebServer server(80);

const int led = LED_BUILTIN;

void getFile(const char * fileName, std::string * str)
{
	char path[80];
	sprintf(path, "/dist/%s", fileName);
    Serial.printf("Reading file: %s\n", path);

    File file = SD.open(path);
    if(!file){
        Serial.println("Failed to open file for reading");
        return;
    }

    Serial.print("Read from file: ");
    while(file.available()){
        str->push_back(file.read());
		//Serial.write(file.read());
    }	
	file.close();
}
void handleRoot() {
	digitalWrite(led, 1);
	server.send(200, "text/plain", "hello from esp!");
	digitalWrite(led, 0);
}

void handleTest() {
    std::string str;
	str="";
	str=str+"<!doctype html>\n";
	str=str+"<html lang=\"en\">\n";
	str=str+"<head>\n";
	str=str+"  <meta charset=\"utf-8\">\n";
	str=str+"  <title>HTML Test Transaction</title>\n";
	str=str+"  <meta name=\"description\" content=\"Some header meta description\">\n";
	str=str+"  <meta name=\"author\" content=\"Some header author content\">\n";
	str=str+"</head>\n";
	str=str+"<body>\n";
	str=str+"  <h3> Test Document Body </h3>\n";
	str=str+"  <p> and a paragraph </p>\n";
	str=str+"</body>\n";
	str=str+"</html>\n";
	digitalWrite(led, 1);
	server.send(200, "text/html", str.c_str());
	digitalWrite(led, 0);
}

void handleFile1() {
    std::string str;
	getFile("favicon.ico", &str);
	digitalWrite(led, 1);
	server.send(200, "image/x-icon", str.c_str());
	digitalWrite(led, 0);
}
void handleFile2() {
    std::string str;
	getFile("index.html", &str);
	digitalWrite(led, 1);
	server.send(200, "text/html", str.c_str());
	digitalWrite(led, 0);
}
void handleFile3() {
    std::string str;
	getFile("inline.cf8f0c043b9526438b75.bundle.js", &str);
	digitalWrite(led, 1);
	server.send(200, "text/javascript", str.c_str());
	digitalWrite(led, 0);
}
//void ESPWebServer::send(int code, const char* content_type, const String& content) {
//    String header;
//    // Can we asume the following?
//    //if(code == 200 && content.length() == 0 && _contentLength == CONTENT_LENGTH_NOT_SET)
//    //  _contentLength = CONTENT_LENGTH_UNKNOWN;
//    _prepareHeader(header, code, content_type, content.length());
//    _currentClient.write(header.c_str(), header.length());
//    if(content.length())
//      sendContent(content);
//}


void handleFile4() {
	char path[80];
	sprintf(path, "/dist/%s", "main.16bb966e5a560cf25de9.bundle.js");
    Serial.printf("Reading file: %s\n", path);
    File file = SD.open(path);
    if(!file){
        Serial.println("Failed to open file for reading");
        return;
    }
	int fileSize = file.size();

    std::string str;
	//getFile("main.16bb966e5a560cf25de9.bundle.js", &str);
	digitalWrite(led, 1);
	//server.send(200, "text/javascript", str.c_str());
	String header;
	server._prepareHeader(header, 200, "text/javascript", fileSize);
	server._currentClient.write(header.c_str(), header.length());
	//_currentClient.write(content.c_str(), len);


    while(file.available()){
		str="";
        str.push_back(file.read());
		server._currentClient.write(str.c_str(), 1);
    }	
	file.close();





	digitalWrite(led, 0);
}

void handleFile5() {
	char path[80];
	sprintf(path, "/dist/%s", "polyfills.ad37cd45a71cb38eee76.bundle.js");
    Serial.printf("Reading file: %s\n", path);
    File file = SD.open(path);
    if(!file){
        Serial.println("Failed to open file for reading");
        return;
    }
	int fileSize = file.size();

    std::string str;
	digitalWrite(led, 1);
	String header;
	server._prepareHeader(header, 200, "text/javascript", fileSize);
	server._currentClient.write(header.c_str(), header.length());
    while(file.available()){
		str="";
        str.push_back(file.read());
		server._currentClient.write(str.c_str(), 1);
    }	
	file.close();
	digitalWrite(led, 0);
}
//void handleFile5() {
//    std::string str;
//	getFile("polyfills.ad37cd45a71cb38eee76.bundle.js", &str);
//	digitalWrite(led, 1);
//	server.send(200, "text/javascript", str.c_str());
//	digitalWrite(led, 0);
//}
void handleFile6() {
    std::string str;
	getFile("styles.d41d8cd98f00b204e980.bundle.css", &str);
	digitalWrite(led, 1);
	server.send(200, "text/css", str.c_str());
	digitalWrite(led, 0);
}
void handleNotFound(){
	digitalWrite(led, 1);
	String message = "File Not Found\n\n";
	message += "URI: ";
	message += server.uri();
	message += "\nMethod: ";
	message += (server.method() == HTTP_GET)?"GET":"POST";
	message += "\nArguments: ";
	message += server.args();
	message += "\n";
	for (uint8_t i=0; i<server.args(); i++){
		message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
	}
	server.send(404, "text/plain", message);
	digitalWrite(led, 0);
}

void setup(void){
	pinMode(led, OUTPUT);
	digitalWrite(led, 0);
	Serial.begin(115200);
	
	//Check for card presence using CD pin
	pinMode(SD_CD_PIN, INPUT);
	if(digitalRead(SD_CD_PIN) == 1) {
		Serial.println("Card detected");
	} else {
		Serial.println("Card not present");
		return;
	}   
	
	//Call begin with (cs pin, SPI, rate (up to 10MHz), "/sd")
	if(!SD.begin(SD_CS_PIN, SPI, 1000000, "/sd")){
		Serial.println("Card Mount Failed");
		return;
	}
	uint8_t cardType = SD.cardType();
	if(cardType == CARD_NONE){
		Serial.println("No SD card attached");
		return;
	}
	Serial.print("SD Card Type: ");
	if(cardType == CARD_MMC){
		Serial.println("MMC");
	} else if(cardType == CARD_SD){
		Serial.println("SDSC");
	} else if(cardType == CARD_SDHC){
		Serial.println("SDHC");
	} else {
		Serial.println("UNKNOWN");
	}
	uint64_t cardSize = SD.cardSize() / (1024 * 1024);
	Serial.printf("SD Card Size: %lluMB\n", cardSize);
	
//	std::string str;
//	getFile("index.html", &str);
//	Serial.println("Got file");
//	Serial.print(str.c_str());
//	
//	while(1);
	WiFi.begin(ssid, password);
	//  Serial.println("Show mac address");
	//	Serial.print(WiFi.macAddress());
	// Wait for connection
	while (WiFi.status() != WL_CONNECTED) {
		delay(500);
		Serial.print(".");
	}
	Serial.println("");
	Serial.print("Connected to ");
	Serial.println(ssid);
	Serial.print("IP address: ");
	Serial.println(WiFi.localIP());

	if (MDNS.begin("esp")) {
		Serial.println("MDNS responder started");
	}

	server.on("/", handleRoot);

	server.on("/test.html", handleTest);

	server.on("/favicon.ico", handleFile1);
	server.on("/index.html", handleFile2);
	server.on("/inline.cf8f0c043b9526438b75.bundle.js", handleFile3);
	server.on("/main.16bb966e5a560cf25de9.bundle.js", handleFile4);
	server.on("/polyfills.ad37cd45a71cb38eee76.bundle.js", handleFile5);
	server.on("/styles.d41d8cd98f00b204e980.bundle.css", handleFile6);

	server.on("/inline", [](){
		server.send(200, "text/plain", "this works as well");
	});

	server.onNotFound(handleNotFound);
	server.begin();
	Serial.println("HTTP server started");
}

void loop(void){
	server.handleClient();
}