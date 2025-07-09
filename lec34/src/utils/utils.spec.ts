import { compileAndroidCode, strReverse, sum } from "./utils"


describe('Utils functions', () => {

    describe('Throw error function', () => {
        it('should trrow errro', () => {
            expect(() => {
                compileAndroidCode()
            }).toThrow(Error)
        })
    })

    describe('sum function', () => {
        it('should return 3 when 2 and 1 passed', () => {
            const result = sum(2, 1)
            expect(result).toBe(3)
        })

        it('test', () => {
            const result = sum(0.1, 0.2)
            expect(result).toBeCloseTo(0.3)
        })
    })

    describe('string reverse', () => {
        it('should return olleh when hello passed', () => {
            const result = strReverse('hello')
            expect(result).toBe('olleh')
        })

        it('test', () => {
            const obj = {
                name: "giorgi",
                address: {
                    home: {
                        test: "test"
                    }
                }
            }
            const obj2 = {
                name: "giorgi",
                address: {
                    home: {
                        test: "asd"
                    }
                }
            }
            expect(obj).toEqual(obj2)
        })
    })

})

