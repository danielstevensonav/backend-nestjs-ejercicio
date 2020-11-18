export interface Tarea {
    id: string;
    title: string;
    description: string;
    status: TareaEstado;
}

export enum TareaEstado {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}