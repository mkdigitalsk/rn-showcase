import 'reflect-metadata';
import { container } from 'tsyringe';
import { TYPES } from '../diTypes';
import { dataModule } from '../../data/di/dataModule';
import { domainModule } from './domainModule';

export const initDI = () => {
    dataModule();
    domainModule();
};

export { container, TYPES };
