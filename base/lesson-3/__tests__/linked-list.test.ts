import { LinkedList } from "../index";

describe("LinkedList", () => {
  test("При создании списка ссылки на первый и последний null", () => {
    const list = new LinkedList();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test("При добавлении первого first и last это один элемент", () => {
    const list = new LinkedList();
    list.append(1);

    expect(list.head?.value).toEqual(1);
    expect(list.tail?.value).toEqual(1);
    expect(list.head?.next === list.tail?.next).toBeTruthy(); /* null */
    expect(list.head?.prev === list.tail?.prev).toBeTruthy(); /* null */
  });

  test("При добавлении второго, первый указывает на второй, а второй на первый", () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);

    expect(list.head?.next?.value).toEqual(2);
    expect(list.tail?.prev?.value).toEqual(1);
  });

  test("При добавлении третьего у второго есть сслыки на первый и третий", () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    const secondItem = list.head?.next;

    expect(secondItem?.value).toEqual(2);
  });
});
