import os from 'os'
import si from 'systeminformation'

const gb = 1024 * 1024 * 1024


interface SystemInfo {
    'Operating System': NodeJS.Platform;
    'Architecture': string;
    'Current User': string;
    'CPU cores models': string[];
    'CPU Temperature': number | null;
    'Graphic controllers vendors and models': { Controller: number; Vendor: string; Model: string }[];
    'Total Memory': string;
    'Free Memory': string;
    'Used Memory': string; // Add 'Used Memory' property
    'Charging': boolean | null;
    'Percent': number | null;
    'Remaining Time': number | null;
}

const system: SystemInfo = {
    'Operating System': os.platform(),
    'Architecture': os.arch(),
    'Current User': os.userInfo().username,
    'CPU cores models': os.cpus().map((one) => one.model),
    'CPU Temperature': null,
    'Graphic controllers vendors and models': [],
    'Total Memory': (os.totalmem() / gb).toFixed(2),
    'Free Memory': (os.freemem() / gb).toFixed(2),
    'Used Memory': '', // Initialize 'Used Memory'
    'Charging': null,
    'Percent': null,
    'Remaining Time': null,
};
system['Used Memory'] = (parseFloat(system['Total Memory']) - parseFloat(system['Free Memory'])).toString()

// Graphic controllers vendors and models
si.graphics()
    .then(data => {
        data.controllers.forEach((controller, index) => {
            system['Graphic controllers vendors and models'].push({
                'Controller': index + 1,
                'Vendor': controller.vendor,
                'Model': controller.model
            })
        });
    })
    .catch(console.error);

si.cpuTemperature()
    .then((data) => {
        system['CPU Temperature'] = data.main
    })
    .catch((error) => {
        console.error(`Error retrieving CPU temperature: ${error}`);
    });


// Battery information
si.battery().then(data =>{
    system['Charging'] = data.isCharging
    system['Percent'] = data.percent
    system['Remaining Time'] = data.timeRemaining
})
function pause(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


const time: number = parseFloat(process.argv[2])

for(let one in system){
    console.log(one, ': ', system[one as keyof SystemInfo])
    await pause(time)
}
