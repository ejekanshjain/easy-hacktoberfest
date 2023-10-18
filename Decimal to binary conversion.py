def integer_decimal_to_binary():
    global num
    integerlist=[]
    integer_num=int(num)

    while integer_num>0:
        fx = integer_num//2
        remainder = integer_num%2
        integer_num = fx
        integerlist.append(remainder)
        reverse_integerlist = integerlist[::-1]

    for i in range(len(reverse_integerlist)):
        z = reverse_integerlist[i]
        print(z,end="")
    print(".",end="")

def fractional_decimal_to_binary():
    global num
    integer_num=int(num)
    fractionallist=[]

    fractional_num = num % 1

    for i in range(10):
        multiply = fractional_num*2

        if multiply==0:
            break
        if multiply < 1:
            fractionallist.append(int(multiply))
            fractional_num = multiply
        else:
            fractionallist.append(1)
            multiply = multiply - 1
            fractional_num = multiply
        i+=1

    for i in range(len(fractionallist)):
        z = fractionallist[i]
        print(z,end="")

def decimal_to_binary():
    print(f"(Decimal) {num} = ",end="")

    integer_decimal_to_binary()
    fractional_decimal_to_binary()

    print(" (Binary)")

num=float(input("Enter a number : "))
decimal_to_binary()