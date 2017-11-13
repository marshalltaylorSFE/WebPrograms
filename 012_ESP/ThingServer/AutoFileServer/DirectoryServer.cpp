#include<Arduino.h>
#include <WiFiClient.h>
#include <ESPWebServer.h>
#include "DirectoryServer.h"
#include "FS.h"
#include "SD.h"

#define SD_CS_PIN 33
#define SD_CD_PIN 38

void FilePath::requestHandler( void ){
	Serial.println(path.c_str());
}

FileServer::FileServer( int port ) : ESPWebServer( port )
{
//	Serial.print(&SD);//
	fs = &SD;
}

int FileServer::mountCard( void )
{
	//Check for card presence using CD pin
	pinMode(SD_CD_PIN, INPUT);
	if(digitalRead(SD_CD_PIN) == 1) {
		Serial.println("Card detected");
	} else {
		Serial.println("Card not present");
		return -1;
	}   
	
	//Call begin with (cs pin, SPI, rate (up to 10MHz), "/sd")
	if(!SD.begin(SD_CS_PIN, SPI, 10000000, "/sd")){
		Serial.println("Card Mount Failed");
		return -1;
	}
	uint8_t cardType = SD.cardType();
	if(cardType == CARD_NONE){
		Serial.println("No SD card attached");
		return -1;
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
	
	return 1;
}

int FileServer::startServer( void ) {
	//Get a directory listing
	buildDirectory(cardRoot.c_str(), 5);
	
	for(int i = 0; i < files.size(); i++)
	{
//		Serial.print(files[i].path.c_str());
//		Serial.print(", ");
//		Serial.print(files[i].size);
//		Serial.print(" bytes\n");
		serveStatic(files[i].HTMLpath.c_str(), SD, files[i].path.c_str(), "no-cache, no-store, must-revalidate");
	}	
	
	begin();
	
	Serial.println("HTTP server started");
}

int FileServer::setCardRoot( const char * str ){
	cardRoot = str;
	return 0;
}

int FileServer::setHTTPRoot( const char * str ){
	HTTPRoot = str;
	return 0;
}

void FileServer::buildDirectory(const char * dirname, uint8_t levels){
    Serial.printf("Listing directory: %s\n", dirname);

    File root = fs->open(dirname);
    if(!root){
        Serial.println("Failed to open directory");
        return;
    }
    if(!root.isDirectory()){
        Serial.println("Not a directory");
        return;
    }
    File file = root.openNextFile();
    while(file){
        if(file.isDirectory()){
//            Serial.print("  DIR : ");
//            Serial.println(file.name());
            if(levels){
					buildDirectory(file.name(), levels -1);
				}
			} else {
//            Serial.print("  FILE: ");
//            Serial.print(file.name());
//            Serial.print("  SIZE: ");
//            Serial.println(file.size());
			//Build URI here
			//remove cardRoot from file name
			String str = file.name();
			str = str.substring(cardRoot.length(), str.length());
			//add HTTPRoot
			str = HTTPRoot + str;
			FilePath _filePath;
			_filePath.HTMLpath = str.c_str();
			_filePath.path = file.name();
			_filePath.size = file.size();
			files.push_back(_filePath);
        }
        file = root.openNextFile();
    }

}