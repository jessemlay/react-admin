const getHeadersWithToken = () => {
   const token = localStorage.getItem('token');
   return { Authorization: `Bearer ${token}` };
};

export const request = (url, config, mapJson = true) => {
   let p = fetch(url, config);
   if (mapJson) p = p.then(res => res.json());
   return p.then(res => {
      if (res && res.hasOwnProperty('error') && res.error) throw res.error;
      return res;
   });
};

export const postHttp = () => {
   const headers = getHeadersWithToken();
   const config = {
      method: 'POST',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      }
   };

   fetch(`api/log/view`, config);
};

export const getRequest = (url, headers, mapJson = true) => {
   const config = {
      method: 'GET',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      }
   };
   return request(url, config, mapJson);
};

export const postRequest = (url, data, headers, mapJson = true) => {
   const config = {
      method: 'POST',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
   };
   return request(url, config, mapJson);
};

export const authGetRequest = (url, mapJson = true) => {
   const headers = getHeadersWithToken();
   return getRequest(url, headers, mapJson);
};

export const authPostRequest = (url, data, mapJson = true) => {
   const headers = getHeadersWithToken();
   return postRequest(url, data, headers, mapJson);
};

export const putRequest = (url, data, headers, mapJson = true) => {
   const config = {
      method: 'PUT',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
   };
   return request(url, config, mapJson);
};

export const authPutRequest = (url, data, mapJson = true) => {
   const headers = getHeadersWithToken();
   return putRequest(url, data, headers, mapJson);
};

export const deleteRequest = (url, headers, mapJson = true) => {
   const config = {
      method: 'DELETE',
      headers: {
         ...headers,
         'Content-Type': 'application/json'
      }
   };
   return request(url, config, mapJson);
};

export const authDeleteRequest = (url, mapJson = true) => {
   const headers = getHeadersWithToken();
   return deleteRequest(url, headers, mapJson);
};
