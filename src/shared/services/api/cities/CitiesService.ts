// import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface ICityList {
  id: number;
  name: string;
}

export interface ICityDetail {
  id: number;
  name: string;
}

export type TCityWithTotalCount = {
  data: ICityList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
  rowsPerQuery = 100,
  id = 0
): Promise<TCityWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?page=${page}&limit=${rowsPerQuery}&filter=${filter}&id=${id}`;

    const { data, headers } = await Api().get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || rowsPerQuery),
      };
    }

    return new Error('Error while listing registers.');
  } catch (error) {

    return new Error(
      (error as { message: string }).message || 'Error while listing registers.'
    );
  }
};

const getById = async (id: number): Promise<ICityDetail | Error> => {
  try {
    const { data } = await Api().get(`/cities/${id}`);

    if (data) {
      return data;
    }

    return new Error('Error when querying record.');
  } catch (error) {
    return new Error(
      (error as { message: string }).message || 'Error when querying record.'
    );
  }
};

const create = async (
  _data: Omit<ICityDetail, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await Api().post<number>('/cities', _data);

    if (data) {
      return data;
    }

    return new Error('Error creating record.');
  } catch (error) {
    console.log('error', error);

    return new Error(
      (error as { message: string }).message || 'Error creating record.'
    );
  }
};

const updateById = async (
  id: number,
  _data: ICityDetail
): Promise<void | Error> => {
  try {
    await Api().put<ICityDetail>(`/cities/${id}`, _data);
  } catch (error) {
    console.log('error', error);

    return new Error(
      (error as { message: string }).message || 'Error updating record.'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/cities/${id}`);
  } catch (error) {
    console.log('error', error);

    return new Error(
      (error as { message: string }).message || 'Error deleting record.'
    );
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
