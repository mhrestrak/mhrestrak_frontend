import http from "./httpService";

const apiEndpoint = "/lists";

export async function getList(id) {
  let url = `${apiEndpoint}?listid=${id}`;
  let { data } = await http.get(url);
  if (data) {
    return data.map((data) => ({
      _id: data.ListValueID,
      name: data.ListValue,
      value: data.ListValueID,
      subValue : data.ListSubValue
    }));
  } else {
    return [];
  }
}
