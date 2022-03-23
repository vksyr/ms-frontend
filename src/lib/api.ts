const APIURL = process.env.REACT_APP_MS_API_URL;

export async function getAllOrganizations() {
  console.debug("getAllOrganizations");
  const response = await fetch(`${APIURL}/Organization`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch organizations.");
  }

  console.debug("Data: ", data);

  const transformedOrganizations = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedOrganizations.push(quoteObj);
  }

  return transformedOrganizations;
}
