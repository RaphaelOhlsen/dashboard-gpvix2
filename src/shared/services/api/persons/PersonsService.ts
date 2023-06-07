// import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IPersonList {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

export interface IPersonDetail {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

export type TPersonWithTotalCount = {
  data: IPersonList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
  rowsPerQuery = 7,
): Promise<TPersonWithTotalCount | Error> => {
  try {
    const relativeUrl = `/persons?_page=${page}&_limit=${rowsPerQuery}&fullName_like=${filter}`;

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

const getById = async (id: number): Promise<IPersonDetail | Error> => {
  try {
    const { data } = await Api().get(`/persons/${id}`);

    if (data) {
      return data;
    }

    return new Error('Error when querying record.');
  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error when querying record.');
  }
};


const create = async (_data: Omit<IPersonDetail, 'id'>): Promise<number | Error> => {
  console.log('Entrou no create do Service---!?!?');
  try {
    const { data } = await Api().post<number>('/persons', _data);
    if (data) {
      console.log('Retornou o dado', data);
      return data;
    }

    return new Error('Error creating record.');

  } catch (error) {
    console.log('error', error);

    return new Error('Error creating record.');
  }
};

const updateById = async (id: number, _data: IPersonDetail): Promise<void | Error> => {
  try {
    await Api().put<IPersonDetail>(`/persons/${id}`, _data);

  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error updating record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/persons/${id}`);
  } catch (error) {
    console.log('error', error);

    return new Error((error as { message: string}).message || 'Error deleting record.');
  }
};

export const PersonsService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
