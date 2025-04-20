namespace CUSTOMERGROUPS {
  export interface CreateGroup {
    groupName: string;
    description: string;
  }
  export interface GROUPS {
    customerGroupId: number;
    groupName: string;
    description: string;
    createdAt: Date;
    updatedAt: null;
    createdBy: number;
    creator: Creator;
    customers: null;
  }

  export interface Creator {
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: null;
    comments: null;
    attachments: null;
    id: number;
    userName: string;
    email: string;
  }
}
