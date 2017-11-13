#include <WiFiClient.h>
#include <ESPWebServer.h>
#include <ESPmDNS.h>
#include "DirectoryServer.h"
#include "SPI.h"
#include <string>

#ifndef LED_BUILTIN
#define LED_BUILTIN 2
#endif

const char* ssid     = "Shaggy";
const char* password = "downinglife";

FileServer server(80);

const int led = 5;

void handleRoot() {
	digitalWrite(led, 1);
	server.send(200, "text/plain", "hello from esp!");
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
	
	if(server.mountCard()==-1)
	{
		Serial.println("Holding program");
		while(1);
	}
	server.setCardRoot("/dist");
	server.setHTTPRoot("");

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

	server.on("/inline", [](){
		server.send(200, "text/plain", "this works as well");
	});

	server.onNotFound(handleNotFound);

	server.startServer();
}

void loop(void){
	server.handleClient();
}