import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker';
import { LangWorker } from './LangWorker';

self.onmessage = () => {
	worker.initialize((ctx) => {
		return new LangWorker(ctx)
	});
};