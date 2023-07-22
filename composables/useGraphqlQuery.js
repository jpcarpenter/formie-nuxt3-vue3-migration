export const useGraphqlQuery = async (params) => {
  const runtimeConfig = useRuntimeConfig();
  const apiBaseUrl = runtimeConfig.public.craftUrl || "";
  const gqlToken = runtimeConfig.public.gqlToken || "";

  const {
    preview,
    token,
    "x-craft-preview": xCraftPreview,
    "x-craft-live-preview": xCraftLivePreview,
  } = params.routeQuery ?? {};

  const apiUrl = preview && token ? `${apiBaseUrl}?token=${token}` : apiBaseUrl;
  const customHeaders = {};

  // If Live Preview
  if (preview && xCraftLivePreview) {
    customHeaders["x-craft-live-preview"] = xCraftLivePreview;
  }

  // If Preview
  if (preview && xCraftPreview) {
    customHeaders["x-craft-preview"] = xCraftPreview;
  }

  // Custom transformer
  const transformData = (response) => {
    return params.responseParameter
      ? response.data[params.responseParameter]
      : response.data;
  };

  try {
    const response = await useFetch(apiUrl, {
      method: "POST",
      key: params.key ?? params.query,
      body: {
        query: params.query,
        variables: params.variables || null,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gqlToken}`,
        ...customHeaders,
      },
      transform: (response) => transformData(response),
    });
    return response;

    // if (params.responseParameter in response) {
    //   return (response as any)[params.responseParameter];
    // }

    // throw createError({
    //   statusCode: 404,
    //   statusMessage:
    //     "This page does not exist or something went wrong while fetching data",
    // });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 404,
      statusMessage: "Problem while fetching data",
    });
  }
};
