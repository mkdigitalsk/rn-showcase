export default async function testScenario<T>({
    given,
    whenAction,
    then
}: {
    given?: () => void,
    whenAction: () => Promise<T>,
    then?: (actual: T) => void
}) {
    given?.()
    const actual = await whenAction()
    then?.(actual)
}


export abstract class BaseTest<T> {
    abstract classUnderTest: T;

    // Setup before each test
    beforeEachTest(given: () => void) {
        beforeEach(() => {
            jest.clearAllMocks();
            given();
        });
    }

    // Cleanup after each test
    afterEachTest() {
        afterEach(() => {
            jest.resetAllMocks();
        });
    }
}

export function createMock<M>(Class: new () => M): jest.MaybeMockedDeep<M> {
    return jest.mocked(new Class())
}

