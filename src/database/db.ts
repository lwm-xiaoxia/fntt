import $event, { $Event } from '../other/event';


class DB {
  // 请求对象
  private _request: IDBOpenDBRequest;
  private _requestEvent: $Event;
  // 数据库对象
  private _database: any;
  // 数据库对象的事件对象
  private _dbEvent: $Event;


  constructor(name: string, version?: number) {
    const indexedDB = window.indexedDB 
      || (window as any).webkitIndexedDB 
      || (window as any).mozIndexedDB 
      || (window as any).msIndexedDB;
    if (!indexedDB) throw new Error('你的浏览器不支持indexedDB');
    this._open(name, version);   
  }

  private _open(name: string, version?: number) {
    this._request = version === undefined 
      ? indexedDB.open(name) 
      : indexedDB.open(name, version);
    this._requestEvent = $event(this._request);
    this._requestEvent.on('error', e => console.error('打开数据库失败')) 
    .on('success', e => {
      console.info('--成功打开数据库--');
      this._database = e.target.result;
    })
    .on('upgradeneeded', e => {
      // console.info('--升级数据库--');
      this._database = e.target.result;
      if (!this._database.objectStoreNames.contains('person')) {
        console.warn("我需要创建一个新的存储对象");
        //如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
        const store = this._database.createObjectStore('person', {
            keyPath: "id",
            autoIncrement: true,
        });

        //指定可以被索引的字段，unique字段是否唯一

        store.createIndex("name", "name", {
            unique: false
        });

        store.createIndex("phone", "phone", {
            unique: false
        });

      }
      console.log('数据库版本更改为： ' + version);
    });
  }

  public add(name: string) {

    const database = this._database.transaction(name, 'readwrite')
      .objectStore(name)
      .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
    $event(database)
      .on('success', e => console.info('--数据写入成功--'))
      .on('error', e => console.error('--数据写入失败--'));

  }

  public read(name: string) {
    const database = this._database.transaction(name).objectStore(name).get(1);
    $event(database)
    .on('error', e => console.error('--数据读取失败--'))
    .on('success', e => {
      if (database.result) {
        console.log('Name: ' + database.result.name);
        console.log('Age: ' + database.result.age);
        console.log('Email: ' + database.result.email);
      } else {
        console.log('未获得数据记录');
      }
    });
      
  }

  public readAll(name: string) {
    const database = this._database.transaction(name).objectStore(name);

    $event(database.openCursor()).on('success', e => {
      var cursor = e.target.result;
 
      if (cursor) {
        console.log('Id: ' + cursor.key);
        console.log('Name: ' + cursor.value.name);
        console.log('Age: ' + cursor.value.age);
        console.log('Email: ' + cursor.value.email);
        cursor.continue();
     } else {
       console.log('没有更多数据了！');
     }
    })
  }

  public updata(name: string) {
    const database = this._database.transaction(name, 'readwrite')
      .objectStore(name)
      .put({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
    $event(database)
      .on('success', e => console.info('--数据更新成功--'))
      .on('error', e => console.error('--数据更新失败--'));
  }

  public remove(name: string) {
    const database = this._database.transaction(name).objectStore(name).delete(1);
    $event(database)
      .on('success', e => console.info('--数据删除成功--'))
      .on('error', e => console.error('--数据删除失败--'));
  }

  public get(name: string, key: string) {
    const database = this._database.transaction(name, 'readonly').objectStore(name).delete(1);
    const index = database.index(key);
    const dbObj = index.get('李四');
    $event(dbObj)
    .on('success', e => {
      const data = e.target.result;
      console.log(data);
    });
  }
}

export default (
  name: string, 
  version?: number,
): DB => new DB(name, version);