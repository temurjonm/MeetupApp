export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber: number;
    pageSize: number;
    orderBy = 'lastActive';

    constructor(user: any) {
        this.gender = user.gender === 'female' ? 'female' : 'male';
        this.pageNumber = 1;
        this.pageSize = 5;
        this.orderBy = 'lastActive';
    }
}