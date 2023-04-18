import { LinkedList } from "../index";

describe("LinkedList", () => {
  test("При создании списка ссылки на первый и последний null", () => {
    const list = new LinkedList();

    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
  });

  test("При добавлении первого first и last это один элемент", () => {
    const list = new LinkedList();
    list.append(1);

    expect(list.first?.value).toEqual(1);
    expect(list.last?.value).toEqual(1);
    expect(list.first?.next === list.last?.next).toBeTruthy(); /* null */
    expect(list.first?.prev === list.last?.prev).toBeTruthy(); /* null */
  });

  test("При добавлении второго, первый указывает на второй, а второй на первый", () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);

    expect(list.first?.next?.value).toEqual(2);
    expect(list.last?.prev?.value).toEqual(1);
  });

  // test("При добавлении третьего у второго есть сслыки на первый и третий", () => {
  //   const list = new LinkedList();
  //   list.append(1);
  //   list.append(2);
  //   list.append(3);

  //   console.log(list.first?.next?.next);

  //   const secondItem = list.first?.next;

  //   expect(secondItem).toEqual(2);
  // });
});
