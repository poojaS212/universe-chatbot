export const getRecentLeads = async() => {
    return await fetch('https://dummyjson.com/products')
    .then(result => result.json())
}

export const getLeadsCharts = async() => {
    return await fetch('https://dummyjson.com/carts')
    .then(result => result.json())

}