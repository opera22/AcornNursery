
const getData = async () => {
    try {
        const response = await axios.get('/getdata');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
};

getData();