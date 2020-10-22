import axios from 'axios';

const univData = {
    university: async (univId) => {
        try {
            return await axios.get(`/api/fac/byuniv/${univId}`);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },
    faculty: async (facId) => {
        try {
            return await axios.get(`/api/depart/byfac/${facId}`);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },

    department: async (departId) => {
        try {
            return await axios.get(`/api/option/bydepart/${departId}`);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },
    option: async (optionId) => {
        try {
            return await axios.get(`/api/prom/byoption/${optionId}`);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },
    setAccountType: async (userId, type) => {
        try {
            return await axios.post(`/api/users/config/${userId}`, { type });
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },
    checkName: async (promId, name) => {
        try {
            return await axios.post(`/api/prom/checkname/${promId}`, name);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },
    sendDemand: async (userId, demandData) => {
        try {
            return await axios.post(`/api/demand/create/${userId}`, demandData);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    },
    sendConfigurations: async (userId, data) => {
        try {
            return await axios.post(`/api/user/config/${userId}`, data);
        } catch (err) {
            return {
                data: {
                    status: "failed",
                    error: err
                }
            };
        }
    }
};

export default univData;