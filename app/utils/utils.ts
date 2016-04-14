// get around TS warnings.
declare var process: any;

export const apiResource = (resource): string => {
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
        const sessid = JSON.parse(localStorage.getItem('activeUser')).SessionID;
        return `https://stage.calamp-ts.com${resource}?sessid=${sessid}`;
    }
    else {
        return `https://stage.calamp-ts.com${resource}`;
    }
};

export const BUILD_NUMBER = process.env.BUDDYBUILD_BUILD_NUMBER || 'Desktop';
export const BUILD_BRANCH = process.env.BUDDYBUILD_BRANCH || 'Desktop';
