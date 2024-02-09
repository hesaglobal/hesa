export class Dates {

    private static date = new Date();

    public static currentDate() {
        return this.date.toISOString().split("T")[0];
    }

    public static AddDate(add: number) {
        const date = new Date();
        date.setDate(date.getDate() + add);
        const covDate = date.toISOString().split('T')[0];
        return covDate;
    }

    public static convertDate(date: any) {
        const dt = new Date(date);
        const cov = dt.toISOString().split('T')[0]; 
        return cov
    }
 

}