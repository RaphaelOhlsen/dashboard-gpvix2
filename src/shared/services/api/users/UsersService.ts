import { Api } from '../axios-config';

export interface IUserList {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface IUserDetail {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type TUserWithTotalCount = {
  data: IUserList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
  rowsPerQuery = 7,
): Promise<TUserWithTotalCount | Error> => {
  try {
    const relativeUrl = `/users?_page=${page}&_limit=${rowsPerQuery}&fullName_like=${filter}`;

    const { data, headers } = await Api().get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || rowsPerQuery),
      };
    }

    return new Error('Error while listing registers.');
  } catch (error) {
    console.log('error de listar', error);

    return new Error((error as { message: string}).message || 'Error while listing registers.');
  }
};

const getById = async (id: number): Promise<IUserDetail | Error> => {
  try {
    const { data } = await Api().get(`/users/${id}`);

    if (data) {
      return data;
    }

    return new Error('Error when querying record.');
  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error when querying record.');
  }
};

const create = async (_data: Omit<IUserDetail, 'id'>): Promise<number | Error> => {
  try {
    console.log(_data);
    const { data } = await Api().post<number>('/users', _data);

    if (data) {
      console.log(data);
      return data;
    }

    return new Error('Error creating record.');

  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error creating record.');
  }
};

const updateById = async (id: number, _data: IUserDetail): Promise<void | Error> => {
  try {
    await Api().put<IUserDetail>(`/users/${id}`, _data);

  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error updating record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/users/${id}`);
  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error deleting record.');
  }
};

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
