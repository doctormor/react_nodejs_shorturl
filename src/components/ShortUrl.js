import Axios from "axios";

function ShortUrl(props) {
  const port = process.env.PORT || 3001;

  Axios.get(`http://localhost:${port}/geturl/` + props.match.params.code)
    .then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        window.location.href = response.data[0].fullurl;
      } else {
        props.history.push("/page/404");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return <div className="cotainer"></div>;
}

export default ShortUrl;
