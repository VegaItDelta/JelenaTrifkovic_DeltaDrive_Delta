class Driver {
    constructor(socket, initialLatitude = 0, initialLongitude = 0) {
        this.socket = socket;
        this.location = {latitude: initialLatitude, longitude: initialLongitude};
        this.speed = 60;
    }

    updateLocationToClients() {
        this.socket.emit('updateLocation', {
            location: this.location,
        });
    }

    driverArrivedToClients() {
        this.socket.emit('driverArrived');
    }

    driveEndedToClients() {
        this.socket.emit('driveEnded');
    }

    simulateDriving(passengerLocation, destinationLocation) {
        this.driveToPassenger(passengerLocation, () => {
            this.driveToDestination(destinationLocation);
        })
    }

    driveToPassenger(passengerLocation, func) {
        console.log(`Driver is driving to the passenger...`);
        this.updateLocationToClients();

        const timeOutId = setTimeout(() => {
            console.log(`Driver has arrived at the passenger's location.`);
            this.location.longitude = passengerLocation.longitude;
            this.location.latitude = passengerLocation.latitude;

            this.updateLocationToClients();
            this.driverArrivedToClients();
            func();
            clearTimeout(timeOutId);
        }, 5000);
    }

    driveToDestination(destinationLocation) {
        console.log(`Driver is driving to the destination...`);

        const timeOutId = setTimeout(() => {
            console.log(`Driver has arrived at the destination.`);
            this.location.longitude = destinationLocation.longitude;
            this.location.latitude = destinationLocation.latitude;

            this.updateLocationToClients();
            this.driveEndedToClients();
            clearTimeout(timeOutId);
        }, 5000);
    }
}

module.exports = {Driver};
