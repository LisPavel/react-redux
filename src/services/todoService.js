import httpService from "./httpService";

const TODOS_ENDPOINT = "todos/";

const todoService = {
    fetch: async () => {
        const { data } = await httpService.get(TODOS_ENDPOINT, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(TODOS_ENDPOINT, payload);
        return data;
    },
};

export default todoService;
