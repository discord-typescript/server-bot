import { Client } from "@typeit/discord";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start(): void {
    this._client = new Client();

    this._client.login(
      "Nzg3NTE0MjQ1ODQ3NDQ5NjEw.X9WDyw.IFy0-vmICCNScQKt2Femp0w5fi8",
      `${__dirname}/*.ts`,
      `${__dirname}/*.js`,
    );
  }
}

Main.start();
