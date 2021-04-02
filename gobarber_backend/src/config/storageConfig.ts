interface IStorageConfig {
    driver: 'diskStorage' | 's3';
}

export default {
    driver: process.env.STORAGE_DRIVER || 'diskStorage',
} as IStorageConfig;
