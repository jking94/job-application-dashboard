export interface Application {
    id: number;
    name: string;
    position: string;
    applied: string;
    experience: number;
    availability: Array<Object>;
    schedule: Array<Object>;
    questions: Array<Object>;
    bookmarked: false;
}
