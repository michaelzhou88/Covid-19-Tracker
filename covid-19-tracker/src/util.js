export const sortData = (data) => {
    const sortedData = [...data];

    // ES5
    // sortedData.sort((a, b) => {
    //     if (a.cases > b.cases) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // });
    // return sortedData;

    // ES6
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
};