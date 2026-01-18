import { 
	G_FETCHER_REGEXP_JSON_CONTENT, 
	G_FETCHER_REGEXP_TEXT_CONTENT 
} from "../REGEXP.const";

export default async function getDataFromResponse<R = any>(response: Response): Promise<R> {
	const contentType: string | null = response.headers.get("Content-Type");

	if(!contentType) {
		return response.text() as R;
	}

	if(G_FETCHER_REGEXP_TEXT_CONTENT.test(contentType)) {
		return await response.text() as R;
	}

	if(G_FETCHER_REGEXP_JSON_CONTENT.test(contentType)) {
		return await response.json() as R;
	}

	return await response.text() as R;
};