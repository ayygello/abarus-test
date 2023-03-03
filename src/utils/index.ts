import { ITable } from '../interfaces';

export const getMatchedPosts = (items: ITable[], keyword: string) => {
  const searchKey = keyword.toLowerCase();
  return items.filter((value) => {
    return (
      value.title.toLowerCase().match(new RegExp(searchKey, 'g')) ||
      value.body.toLowerCase().match(new RegExp(searchKey, 'g'))
    );
  });
};
