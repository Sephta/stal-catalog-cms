import axios from "axios";

/** AsyncFetch Function
 * A wrapper function for lazy fetching with axios.
 *
 * @param {string} type the axios type for this fetch.
 * @param {string} url the url to fetch from.
 * @param {string} endpoint the endpoint.
 * @param {object} data json object with data?
 * @param {function} onSuccess function handler for successful fetch.
 * @param {function} onFailure function handler for unsuccesful fetch.
 * @returns void
 */
const AsyncFetch = async ({
  type,
  url = process.env.REACT_APP_SERVER_URL,
  endpoint,
  data = null,
  headers,
  onSuccess,
  onFailure,
}) => {
  const full_url = url + endpoint;
  try {
    const result = await axios({
      method: type,
      url: full_url,
      data: data,
      headers,
    });
    if (onSuccess) {
      onSuccess(result);
    }
  } catch (err) {
    if (onFailure) {
      onFailure(err);
    } else if (err.response && err.response.data) {
      // Set the errors provided by our API request
      console.log(err.response.data.errors);
    } else {
      console.log("An error occurred");
    }
  }
};

export default AsyncFetch;
