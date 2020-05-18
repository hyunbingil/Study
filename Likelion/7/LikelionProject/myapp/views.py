from django.shortcuts import render

# Create your views here.
def result(request):
    temp_target = request.GET['target'] # get방식으로 받는다.
    result_len = len(temp_target) # len이라는 내장함수!(글자수 계산)
    context =  {'display_value': result_len,}
    return render(request, 'result.html', context)