/**
 * Base class for all unit tests.
 * Mirrors the KMP showcase BaseTest pattern.
 *
 * Subclasses must:
 * 1. Set `classUnderTest` in `beforeEach()`
 * 2. Implement `beforeEach()` to create a fresh instance per test
 *
 * Usage:
 *   class MyUseCaseTest extends BaseTest<MyUseCase> {
 *     classUnderTest!: MyUseCase;
 *     beforeEach() { this.classUnderTest = new MyUseCase(mockDep); }
 *   }
 */
export abstract class BaseTest<ClassUnderTest> {
  abstract classUnderTest: ClassUnderTest;

  abstract beforeEach(): void;

  /**
   * Call this from a jest beforeEach block:
   *   beforeEach(() => instance.setup());
   */
  setup(): void {
    this.beforeEach();
  }
}
