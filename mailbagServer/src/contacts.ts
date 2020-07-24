import * as path from "path";
const DataStore = require("nedb");

export interface IContact {
  _id?: number;
  name: string;
  email: string;
}

export class Worker {
  private db: Nedb;
  constructor() {
    this.db = new DataStore({
      filename: path.join(__dirname, "contacts.db"),
      autoload: true,
    });
  }

  //curl localhost:3000/contacts
  public listContacts(): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find({}, (inError: Error, inDocs: IContact[]) => {
        if (inError) {
          inReject(inError);
        } else {
          inResolve(inDocs);
        }
      });
    });
  }

  //curl -d '{"name" : "Adam brittain", "email":"adsy.britt@gmail.com"}' -H "Content-type:application/JSON" -X POST localhost:3000/contacts

  public addContact(inContact: IContact): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      this.db.insert(inContact, (inError: Error | null, inNewDoc: IContact) => {
        if (inError || null) {
          inReject(inError);
        } else {
          inResolve(inNewDoc);
        }
      });
    });
  }

  //curl -X DELETE localhost:3000/contacts/sJKbINkpVSFQj9gf
  public deleteContact(inID: string): Promise<string> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id: inID },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError || null) {
            inReject(inError);
          } else {
            inResolve();
          }
        }
      );
    });
  }

  //curl -d '{"name" : "Adam Brittain", "email":"test@gmail.com"}' -H "Content-type:application/json" -X PUT localhost:3000/contacts/ZBHRsAmRiFVHdLt7
  public updateContact(inID: string, inContact: IContact): Promise<number> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: inID },
        { inContact },
        {},
        (inError: Error | null, numReplaced: number) => {
          if (inError || null) {
            inReject(inError);
          } else {
            inResolve(numReplaced);
          }
        }
      );
    });
  }
}
