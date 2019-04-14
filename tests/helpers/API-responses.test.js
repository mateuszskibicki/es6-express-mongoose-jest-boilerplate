import { APIsuccess, APIerror } from '../../server/helpers/API-responses';

describe('API-responses', () => {
  test('APIsuccess', done => {
    const msg = 'It works.';
    const { success, status, data } = APIsuccess(200, { msg });
    expect(success).toBeTruthy();
    expect(status).toBe(200);
    expect(data).toHaveProperty('msg');
    expect(data.msg).toEqual(msg);
    done();
  });

  test('APIerror', done => {
    const msg = "It doesn't work.";
    const { success, status, data } = APIerror(404, { msg });
    expect(success).toBeFalsy();
    expect(status).toBe(404);
    expect(data).toHaveProperty('msg');
    expect(data.msg).toEqual(msg);
    done();
  });
});
