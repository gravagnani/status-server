import { ServerStatusController } from './controller/server-status-controller.js';

function verifyStatus() {
    const server_status_controller = new ServerStatusController();

    const server_status_list = await server_status_controller.findAll();
    console.log(server_status_list);

}

function main() {
    verifyStatus();
}

main()
