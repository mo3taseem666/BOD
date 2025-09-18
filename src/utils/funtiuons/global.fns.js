export function paginationKeyCreator(pagination = {}) {
    return `${Object.values(pagination).join('-')}`;
}

export function paginationConvertor(pagination) {
    return {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize
    };
}
