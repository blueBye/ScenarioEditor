import * as monaco from "monaco-editor-core";

import Uri = monaco.Uri;
import { LangWorker } from './LangWorker';
import { languageID } from './config';


export class WorkerManager {
	private worker: monaco.editor.MonacoWebWorker<LangWorker>;
	private workerClientProxy: Promise<LangWorker>;

	constructor() {
		this.worker = null;
	}

	private getClientproxy(): Promise<LangWorker> {

		if (!this.workerClientProxy) {
			this.worker = monaco.editor.createWebWorker<LangWorker>({
				// module that exports the create() method and returns a `JSONWorker` instance
				moduleId: 'LangWorker',
				label: languageID,
				// passed in to the create() method
				createData: {
					languageId: languageID,
				}
			});

			this.workerClientProxy = <Promise<LangWorker>><any>this.worker.getProxy();
		}

		return this.workerClientProxy;
	}

	async getLanguageServiceWorker(...resources: Uri[]): Promise<LangWorker> {
		const _client: LangWorker = await this.getClientproxy();
		await this.worker.withSyncedResources(resources)
		return _client;
	}
}