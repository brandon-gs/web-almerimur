export interface DriverWorkResponse {
  driver_work_id: string;
  driver_work_client_name?: string;
  driver_work_comments?: string;
  driver_work_concept?: string;
  driver_work_created_at?: string;
  driver_work_date?: string;
  driver_work_hours?: string;
  driver_work_project_name?: string;
  driver_work_travels?: string;
  driver_work_vehicle_name?: string;
  driver_work_user_id?: string;
  driver_work_finished: boolean;
}

export interface MechanicWorkResponse {
  mechanic_work_id: string;
  mechanic_work_client_name?: string;
  mechanic_work_date?: string;
  mechanic_work_hours?: string;
  mechanic_work_machine_name?: string;
  mechanic_work_user_id: string;
  mechanic_work_works?: string;
  mechanic_work_finished: boolean;
  mechanic_work_created_at: string;
}

export interface User {
  id: string;
  role: string;
  name: string;
  hourly: string;
}

export interface TableWork {
  id: string;
  date: string; // String date
  role: string;
  userName: string;
  hourly: string;
  machine: string;
  client: string;
  project?: string;
  hours?: string;
  checked: boolean;
  createdAt: string;
}
