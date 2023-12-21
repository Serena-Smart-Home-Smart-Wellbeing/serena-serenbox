#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "Wokwi-GUEST";
const char *password = "";

#define LED 2
#define LED2 4

void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password, 6);
    Serial.print("Connecting");

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    // Print IP address and MAC address
    Serial.println();
    Serial.println("------------------------------------");
    Serial.println("WiFi connected successfully");
    Serial.print("IP Address: ");
    String ip = WiFi.localIP().toString();
    Serial.println(ip);
    Serial.print("MAC address: ");
    String mac = WiFi.macAddress();
    Serial.println(mac);
    Serial.println("------------------------------------");

    UpdateIPAddress(mac, ip);

    pinMode(LED, OUTPUT);
    pinMode(LED2, OUTPUT);
}

String url = "https://serena-backend-2g6tjw7nja-et.a.run.app/serenplace";

void loop()
{
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;

        // URL to check SerenBox slots status
        String credentials = WiFi.macAddress();
        String url = "https://serena-backend-2g6tjw7nja-et.a.run.app/devices/serenbox/{credentials}/slots";
        url.replace("{credentials}", credentials);

        http.begin(url);

        int httpCode = http.GET();

        // Check the returning code
        if (httpCode > 0)
        {
            String serenBoxSlotsStatus = http.getString();
            // Parse JSON
            DynamicJsonDocument doc(2048);
            deserializeJson(doc, serenBoxSlotsStatus);

            String isSessionRunning = doc["isSessionRunning"];

            if (isSessionRunning == "false")
            {
                Serial.println("Session is not running");
                digitalWrite(LED, LOW);
                digitalWrite(LED2, HIGH);
                return;
            }

            String serenBoxId = doc["serenBoxId"];
            String sessionId = doc["sessionId"];
            String startTime = doc["startTime"];
            String slotAStatus = doc["slotA"];
            String slotBStatus = doc["slotB"];

            Serial.println("------------------------------------");
            Serial.println("Session Info");
            Serial.println("SerenBox ID: " + serenBoxId);
            Serial.println("Session ID: " + sessionId);
            Serial.println("Start time: " + startTime);

            // Serial.println("SerenBox slots status:");
            // Serial.println(serenBoxSlotsStatus);
            // Serial.println("Slot A status:");
            // Serial.println(slotAStatus);
            // Serial.println("Slot B status:");
            // Serial.println(slotBStatus);

            if (slotAStatus == "true")
            {
                Serial.println("Slot A is on");
                digitalWrite(LED, HIGH);
                digitalWrite(LED2, LOW);
            }
            else
            {
                Serial.println("Slot A is off");
                digitalWrite(LED, LOW);
                digitalWrite(LED2, HIGH);
            }

            if (slotBStatus == "true")
            {
                Serial.println("Slot B is on");
                digitalWrite(LED, LOW);
                digitalWrite(LED2, HIGH);
            }
            else
            {
                Serial.println("Slot B is off");
                digitalWrite(LED, HIGH);
                digitalWrite(LED2, LOW);
            }
        }
        else
        {
            Serial.println("Error on HTTP request");
            Serial.println(httpCode);
        }

        Serial.println("------------------------------------");
        http.end();
    }
    else
    {
        Serial.println();
        Serial.println("Error in WiFi connection");
    }

    delay(500); // Send a request every 0.5 seconds
}

void UpdateIPAddress(String MACAddress, String ipAddress)
{
    const String url = "https://serena-backend-2g6tjw7nja-et.a.run.app/devices/serenbox";

    Serial.println("------------------------------------");
    Serial.print("Updating SerenBox IP Address...");

    HTTPClient http;
    http.begin(url);

    http.addHeader("Content-Type", "application/json");

    String json_1 = "{\r\n  \"credentials\": \"";
    String json_2 = MACAddress + "\",\r\n  \"ip_address\": \"";
    String json_3 = ipAddress;
    String json_4 = "\"\r\n}";
    String httpRequestData = json_1 + json_2 + json_3 + json_4;

    int httpResponseCode = http.PATCH(httpRequestData);
    if (httpResponseCode > 0)
    {
        Serial.println("Update Success");
        Serial.print("HTTP ");
        Serial.println(httpResponseCode);
        String serenBoxSlotsStatus = http.getString();
        Serial.println();
        Serial.println(serenBoxSlotsStatus);
        Serial.println("------------------------------------");
    }
    else
    {
        Serial.println();
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
    }
    http.end();
}

void activateDiffuser(int positivePin, int negativePin)
{
    digitalWrite(positivePin, HIGH); // Mengatur pin + soar piezo menjadi HIGH
    digitalWrite(negativePin, LOW);  // Mengatur pin - soar piezo menjadi LOW
}

void deactivateDiffuser(int positivePin, int negativePin)
{
    digitalWrite(positivePin, LOW); // Mengatur pin + soar piezo menjadi LOW
    digitalWrite(negativePin, LOW); // Mengatur pin - soar piezo menjadi LOW
}