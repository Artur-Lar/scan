export async function fetchSearchResults(formData, accessToken) {
  const baseURL = "https://gateway.scan-interfax.ru";
  const endpoint = "/api/v1/objectsearch/histograms";
  const fullURL = baseURL + endpoint;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(fullURL, requestOptions);
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error performing API request: " + error.message);
  }
}
