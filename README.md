# pm2-prtg-sensor
Simple PRTG HTTP Push Data Advanced Sensor data (cpu, memory) from PM2 services.

Add the HTTP PUSH DATA ADVANCED sensor in PRTG:
https://www.paessler.com/manuals/prtg/http_push_data_advanced_sensor

- Under the settings of the sensor change the HTTP PUSH -> Request Method to GET.
- Note or update the port number
- Add a Identification token eg: 7F491F55-6C7F-4EC6-80BF-F66E0BAFCE0A
- Save the sensor settings

Install PM2 module:
~~~
pm2 install pm2-prtg-sensor
pm2 show pm2-prtg-sensor
~~~

- Note the exec cwd path
- Update the config.js in the exec path with the port and token values.
- Adjust the reporting interval time

~~~
pm2 restart pm2-prtg-sensor
~~~

All running services in PM2 will now report cpu and memory data to prtg.




