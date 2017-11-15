export class Esp32DataTypes {
}

export class StatusList {
	card: boolean;
	i2c: boolean;
	running: boolean;
}

export class StatusPacket {
	seqNum: number;
	status: StatusList;
	console: string[];
}

export class CommandPacket {
	command: number;
}