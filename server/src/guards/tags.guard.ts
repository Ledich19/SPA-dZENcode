import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class InputValidationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const data = context.switchToWs().getData();
      if (!data) {
        throw new ForbiddenException('Missing input data');
      }
      console.log(data);

      // check tags
      const hasHtmlTags = /<(?!\/?(a|code|i|strong)\b)[^>]*>/i.test(data);
      if (hasHtmlTags) {
        throw new ForbiddenException('Invalid HTML tags');
      }
      //check close tags
      function checkCloseTags(html) {
        const openTags = html.match(/<(\w+)[^>]*>/g) || [];
        const closeTags = html.match(/<\/(\w+)>/g) || [];

        const unclosedTags = openTags
          .map((tag) => tag.match(/<(\w+)/)[1])
          .filter((tagName) => !closeTags.includes(`</${tagName}>`));

        return unclosedTags.length > 0 ? false : true;
      }
      if (!checkCloseTags(data.toString())) {
        throw new ForbiddenException('Improperly closed HTML tags');
      }

      return true;
    } catch (error) {
      console.error('Data validation error:', error.message);
      return false;
    }
  }
}
